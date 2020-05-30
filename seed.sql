INSERT INTO department (name)
VALUES ("Accounting"), ("Marketing"), ("Finance"), ("Sales"), ("Engineering"), ("Legal");

INSERT INTO role (title, salary, department_id)
VALUES ("Director of Accounting", 125000, 1), ("Senior Accountant", 75000, 1), ("Marketing Associate", 50000, 2), ("VP of Finance", 175000, 3), ("Sales Lead", 100000, 4), ("Salesperson", 80000, 4), ("Lead Engineer", 150000, 5), ("Senior Software Engineer", 125000, 5), ("Software Engineer", 110000, 5), ("General Counsel", 180000, 6);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Justin", "Chee", 1, NULL), ("Matthew", "Takara", 2, 1), ("Sophia", "Carlson", 3, NULL), ("Jim", "Niemann", 4, NULL), ("Joshua", "Atnip", 5, NULL), ("Ryan", "Billings", 6, 5), ("Roberto", "Chavez", 7, NULL), ("Paige", "Johnson", 8, 7), ("Douglas", "Ferguson", 9, 7), ("Saul", "Goodman", 10, NULL);