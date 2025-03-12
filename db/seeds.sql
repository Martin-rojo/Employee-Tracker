-- Insert sample departments
INSERT INTO department (name)
VALUES 
    ('Engineering'),
    ('Finance'),
    ('Legal'),
    ('Sales'),
    ('Human Resources');

-- Insert sample roles
INSERT INTO role (title, salary, department_id)
VALUES
    ('Software Engineer', 120000, 1),
    ('Lead Engineer', 150000, 1),
    ('Accountant', 125000, 2),
    ('Finance Manager', 160000, 2),
    ('Lawyer', 190000, 3),
    ('Legal Team Lead', 250000, 3),
    ('Salesperson', 80000, 4),
    ('Sales Manager', 100000, 4),
    ('HR Specialist', 70000, 5),
    ('HR Manager', 98000, 5);

-- Insert sample employees
-- Note: We'll add managers first, then update the manager_id for other employees
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('John', 'Doe', 2, NULL),      -- Lead Engineer (manager)
    ('Jane', 'Smith', 4, NULL),    -- Finance Manager (manager)
    ('Michael', 'Johnson', 6, NULL), -- Legal Team Lead (manager)
    ('Sarah', 'Williams', 8, NULL), -- Sales Manager (manager)
    ('David', 'Brown', 10, NULL),   -- HR Manager (manager)
    ('Emily', 'Davis', 1, 1),      -- Software Engineer, reports to John Doe
    ('Robert', 'Miller', 1, 1),    -- Software Engineer, reports to John Doe
    ('Jennifer', 'Wilson', 3, 2),  -- Accountant, reports to Jane Smith
    ('William', 'Taylor', 5, 3),   -- Lawyer, reports to Michael Johnson
    ('Jessica', 'Anderson', 7, 4), -- Salesperson, reports to Sarah Williams
    ('Christopher', 'Thomas', 7, 4), -- Salesperson, reports to Sarah Williams
    ('Ashley', 'Jackson', 9, 5);   -- HR Specialist, reports to David Brown