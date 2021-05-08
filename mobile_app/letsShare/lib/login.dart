import 'package:flutter/material.dart';
import 'package:dio/dio.dart';
import 'package:lets_share/home.dart';

import 'globals.dart';
import 'register.dart';

class login extends StatefulWidget {
  @override
  _loginState createState() => _loginState();
}

class _loginState extends State<login> {
  void login(email, pass) async {
    try {
      var response = await Dio()
          .post(url + '/login', data: {'email': email, 'password': pass});
      loggedIn = true;
      token = response.data["token"];
      Navigator.push(context, MaterialPageRoute(builder: (context) => Home()));
    } catch (e) {
      print(e);
      if (e.response.statusCode == 401) {
        ScaffoldMessenger.of(context)
            .showSnackBar(const SnackBar(content: Text('Login failed')));
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    TextEditingController email = new TextEditingController();
    email.text = "test@gmail.com";
    TextEditingController pass = new TextEditingController();
    pass.text = "123456";
    return Scaffold(
      body: Container(
        padding: const EdgeInsets.all(20.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            Container(
              child: Text('Lets share'),
            ),
            SizedBox(
              height: 15,
            ),
            Container(
              child: Image(
                width: 180,
                image: AssetImage('assets/img/user.png'),
              ),
            ),
            SizedBox(
              height: 30,
            ),
            TextField(
              controller: email,
              decoration: InputDecoration(
                labelText: "Email",
                labelStyle: TextStyle(fontSize: 15, color: Colors.blue),
                enabledBorder: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(10),
                    borderSide: BorderSide(color: Colors.blue.shade200)),
                focusedBorder: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(10),
                    borderSide: BorderSide(color: Colors.blue.shade500)),
              ),
            ),
            SizedBox(
              height: 15,
            ),
            TextField(
              controller: pass,
              obscureText: true,
              decoration: InputDecoration(
                labelText: "Password",
                labelStyle: TextStyle(fontSize: 15, color: Colors.blue),
                enabledBorder: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(10),
                    borderSide: BorderSide(color: Colors.blue.shade200)),
                focusedBorder: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(10),
                    borderSide: BorderSide(color: Colors.blue.shade500)),
              ),
            ),
            SizedBox(
              height: 30,
            ),
            Container(
              height: 50,
              width: double.infinity,
              decoration: BoxDecoration(
                  color: Colors.blue, borderRadius: BorderRadius.circular(5)),
              child: GestureDetector(
                child: TextButton(
                  onPressed: () {
                    login(email.text, pass.text);
                    //Get.offAll(Home());
                  },
                  child: Text("Login",
                      style: TextStyle(
                          color: Colors.white, fontWeight: FontWeight.bold)),
                ),
              ),
            ),
            SizedBox(
              height: 10,
            ),
            Container(
              height: 50,
              width: double.infinity,
              decoration: BoxDecoration(
                  color: Colors.blue, borderRadius: BorderRadius.circular(5)),
              child: GestureDetector(
                child: TextButton(
                  onPressed: () {
                    Navigator.push(context,
                        MaterialPageRoute(builder: (context) => Register()));
                    print('register');
                  },
                  child: Text("Register",
                      style: TextStyle(
                          color: Colors.white, fontWeight: FontWeight.bold)),
                ),
              ),
            )
          ],
        ),
      ),
    );
  }
}
