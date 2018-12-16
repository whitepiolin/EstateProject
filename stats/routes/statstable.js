exports.list = function(req, res){

  req.getConnection(function(err,connection){  

      var query = connection.query('SELECT * FROM statsHousesForSale where city="Amsterdam',function(err,rows){
        if(err)
          console.log("Error Selecting ",err );

        res.render('./views/table.ejs',{page_title:"Stats Table", data:rows});
      });
  });
};