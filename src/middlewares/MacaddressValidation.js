// validaçao macaddress

const MacaddressValidation = (req, res, next) => {
    if(!req.body.macaddress){ // se nao existir macaddress exibir mensagem de erro
        return res.status(400).json({ error: "Macaddress é obrigatório" });
    } else {
        next();
    }
}

module.exports = MacaddressValidation;