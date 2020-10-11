update
roles
set
title=?,salary=?,department_id=(select id from departments where name=?)
where id=?;