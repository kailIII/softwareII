var React = require('react');
var login = React.createClass({
 render: function() {
  return (
   <div>
    <meta charSet="utf-8" />
    <meta content="IE=edge" httpEquiv="X-UA-Compatible" />
    <title>AdminLTE 2 | Log in</title>
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
    <div className="login-box">
     <div className="login-logo">
      <a href="../../index2.html"><b>Admin</b>LTE</a>
     </div>{/* /.login-logo */}
     <div className="login-box-body">
      <p className="login-box-msg">Sign in to start your session</p>
      <form method="post" action="/users/login">
       <div className="form-group has-feedback">
        <input type="text" placeholder="Username" name="username" className="form-control" />
        <span className="glyphicon glyphicon-envelope form-control-feedback" />
       </div>
       <div className="form-group has-feedback">
        <input type="password" name="password"  placeholder="Password" className="form-control" />
        <span className="glyphicon glyphicon-lock form-control-feedback" />
       </div>
       <div className="row">
        <div className="col-xs-8">
         <div className="checkbox icheck">
          <label>
           <input type="checkbox" /> Remember Me
          </label>
         </div>
        </div>{/* /.col */}
        <div className="col-xs-4">
         <button className="btn btn-primary btn-block btn-flat" type="submit">Sign In</button>
        </div>{/* /.col */}
       </div>
      </form>
      <div className="social-auth-links text-center">
       <p>- OR -</p>
       <a className="btn btn-block btn-social btn-facebook btn-flat" href="#"><i className="fa fa-facebook" /> Sign in using Facebook</a>
       <a className="btn btn-block btn-social btn-google btn-flat" href="#"><i className="fa fa-google-plus" /> Sign in using Google+</a>
      </div>{/* /.social-auth-links */}
      <a href="#">I forgot my password</a><br />
      <a className="text-center" href="register.html">Register a new membership</a>
     </div>{/* /.login-box-body */}
    </div>{/* /.login-box */}
    {/* jQuery 2.1.4 */}
    {/* Bootstrap 3.3.5 */}
    {/* iCheck */}
   </div>
  );
 }
});

module.exports = login;
