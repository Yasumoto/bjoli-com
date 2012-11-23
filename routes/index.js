
/*
 * GET home page.
 */

exports.index = function(req, res){
  var hostname;
  hostname = req.header('host');
  if ( hostname === "kaitlinmilliot.com" ) {
    return res.render('kmills');
  } else if (hostname === "farrahsmithdesign.com") {
      return res.render("farrahsmithdesign");
  } else {
    return res.render('index', { title: 'Joe Smith' });
  }
};
