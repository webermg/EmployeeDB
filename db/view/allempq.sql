SELECT ersub.id,ersub.first_name,ersub.last_name,ersub.title,ersub.department,ersub.salary,CONCAT(msub.first_name,' ',msub.last_name) AS manager
FROM
(SELECT employees.id,employees.first_name,employees.last_name,rsub.title,rsub.department,rsub.salary,employees.manager_id 
FROM
employees JOIN (select roles.id,roles.title,roles.salary,departments.name AS department from roles JOIN departments ON roles.department_id = departments.id) AS rsub
ON
employees.role_id=rsub.id) AS ersub
LEFT JOIN
(SELECT e1.id,e1.first_name,e1.last_name,e2.first_name AS mf,e2.last_name AS ml FROM employees e1 LEFT JOIN employees e2 ON e1.manager_id=e2.id) AS msub
ON
ersub.manager_id = msub.id order by id;