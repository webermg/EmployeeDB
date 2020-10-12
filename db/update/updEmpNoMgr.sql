update employees
SET 
first_name = ?,
last_name=?,
role_id=(SELECT id FROM roles WHERE roles.title=?),
manager_id = null
WHERE 
employees.id=?;