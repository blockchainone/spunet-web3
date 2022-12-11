module.exports = async (req, res, next) => {
    if (req.fields != null) {
        if(req.fields.value){
            req.fields.value = JSON.parse(req.fields.value)
        }
        if(req.fields.attributes){
            req.fields.attributes = JSON.parse(req.fields.attributes)
        }
        req.body = {
            ...req.body,
            ...req.fields
        };
    }
    next();
};
