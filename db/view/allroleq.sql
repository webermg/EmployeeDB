SELECT roles.id,roles.title,roles.salary,departments.name AS department 
FROM 
employee_db.roles 
JOIN departments 
ON 
roles.department_id 
WHERE 
roles.department_id=departments.id
ORDER BY roles.id;