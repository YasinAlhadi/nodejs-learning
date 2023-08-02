const data = {
  employees: require("../data/employees.json"),
  setEmployees: function (data) {
    this.employees = data;
  },
};

const getEmployees = (req, res) => {
  res.json(data.employees);
};

const postEmployees = (req, res) => {
  res.json({
    username: req.body.username,
    lastname: req.body.lastname,
  });
};

const putEmployees = (req, res) => {
  res.json({
    username: req.body.username,
    lastname: req.body.lastname,
  });
};

const deleteEmployees = (req, res) => {
  res.json({
    id: req.body.id,
  });
};

const getEmployee = (req, res) => {
  res.json({ id: req.params.id });
};

module.exports = {
  getEmployees,
  postEmployees,
  putEmployees,
  deleteEmployees,
  getEmployee,
};
