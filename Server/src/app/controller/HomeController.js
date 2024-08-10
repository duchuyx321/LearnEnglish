class HomeController {

    //[GET] --/
    async Home (req,res,next) {
        try{
            res.status(200).json("hello world");
        }catch(err){
            req.status(403).json({message: err});
        }
    }
}

module.exports = new HomeController();