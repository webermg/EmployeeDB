SELECT concat(t.first_name,' ',t.last_name) AS name,count(employees.id) AS value
FROM 
employees 
JOIN 
employees AS t 
ON 
t.id=employees.manager_id 
GROUP BY employees.manager_id;