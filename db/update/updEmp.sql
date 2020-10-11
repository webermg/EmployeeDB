update employees, (SELECT id FROM employees WHERE first_name=? AND last_name=?) as t
SET 
first_name = ?,
last_name=?,
role_id=(SELECT id FROM roles WHERE roles.title=?),
manager_id = t.id
WHERE 
employees.id=?;