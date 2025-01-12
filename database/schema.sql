-- 创建枚举类型
DO $$
BEGIN
    -- 创建待办事项状态枚举
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'todo_status') THEN
        CREATE TYPE todo_status AS ENUM ('pending', 'in_progress', 'completed', 'cancelled');
    END IF;
    
    -- 创建优先级枚举
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'priority_level') THEN
        CREATE TYPE priority_level AS ENUM ('low', 'medium', 'high', 'urgent');
    END IF;
END$$;

-- 创建用户表
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 创建待办事项表
CREATE TABLE IF NOT EXISTS todos (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status todo_status DEFAULT 'pending',
    priority priority_level DEFAULT 'medium',
    category VARCHAR(50),
    due_date TIMESTAMP WITH TIME ZONE,
    completed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT valid_dates CHECK (
        (due_date IS NULL OR due_date > created_at) AND
        (completed_at IS NULL OR completed_at >= created_at)
    )
);

-- 创建标签表
CREATE TABLE IF NOT EXISTS tags (
    id SERIAL PRIMARY KEY,
    name VARCHAR(30) NOT NULL UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 创建待办事项-标签关联表
CREATE TABLE IF NOT EXISTS todo_tags (
    todo_id INTEGER REFERENCES todos(id) ON DELETE CASCADE,
    tag_id INTEGER REFERENCES tags(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (todo_id, tag_id)
);

-- 创建更新时间触发器函数
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 为users表创建触发器
DROP TRIGGER IF EXISTS update_users_updated_at ON users;
CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- 为todos表创建触发器
DROP TRIGGER IF EXISTS update_todos_updated_at ON todos;
CREATE TRIGGER update_todos_updated_at
    BEFORE UPDATE ON todos
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- 插入测试数据
INSERT INTO users (username, password, email) VALUES
('test_user', '123456', 'test@example.com'),
('admin', '123456', 'admin@example.com');

INSERT INTO tags (name) VALUES
('工作'),
('个人'),
('紧急'),
('学习');

INSERT INTO todos (user_id, title, description, status, priority, category, due_date) VALUES
(1, '完成项目文档', '编写项目技术文档和用户手册', 'pending', 'high', '工作', CURRENT_TIMESTAMP + INTERVAL '7 days'),
(1, '健身计划', '每周三次健身房锻炼', 'in_progress', 'medium', '个人', CURRENT_TIMESTAMP + INTERVAL '30 days'),
(2, '团队会议', '讨论下一阶段项目计划', 'pending', 'urgent', '工作', CURRENT_TIMESTAMP + INTERVAL '1 day');

INSERT INTO todo_tags (todo_id, tag_id) VALUES
(1, 1), -- 工作标签
(1, 3), -- 紧急标签
(2, 2), -- 个人标签
(3, 1), -- 工作标签
(3, 3); -- 紧急标签

-- 创建索引以提高查询性能
CREATE INDEX idx_todos_user_id ON todos(user_id);
CREATE INDEX idx_todos_status ON todos(status);
CREATE INDEX idx_todos_due_date ON todos(due_date);
CREATE INDEX idx_todo_tags_todo_id ON todo_tags(todo_id);
CREATE INDEX idx_todo_tags_tag_id ON todo_tags(tag_id); 