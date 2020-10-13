SELECT temp.name,sum(temp.salary) as cost
FROM 
(SELECT e.title,e.salary,departments.name 
FROM 
(SELECT roles.title,roles.salary,department_id FROM employee_db.employees JOIN roles ON role_id = roles.id) AS e 
JOIN 
departments 
ON 
department_id = departments.id) AS temp 
GROUP BY temp.name;