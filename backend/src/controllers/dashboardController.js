const adminDashboard = async (req, res) => {

  res.json({
    message: 'Bienvenido ADMIN',
    user: req.user
  })

}

const empresaDashboard = async (req, res) => {

  res.json({
    message: 'Bienvenido EMPRESA',
    user: req.user
  })

}

const clienteDashboard = async (req, res) => {

  res.json({
    message: 'Bienvenido CLIENTE',
    user: req.user
  })

}

module.exports = {
  adminDashboard,
  empresaDashboard,
  clienteDashboard
}