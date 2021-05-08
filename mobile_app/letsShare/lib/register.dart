import 'package:flutter/material.dart';
import 'package:dio/dio.dart';
import 'globals.dart';
import 'home.dart';

class Register extends StatefulWidget {
  Register({Key key}) : super(key: key);

  @override
  _RegisterState createState() => _RegisterState();
}

const double width = 450.0;
const double height = 60.0;
const double loginAlign = -1;
const double signInAlign = 1;
const Color selectedColor = Colors.white;
const Color normalColor = Colors.black54;

class _RegisterState extends State<Register> {
  register() async {
    try {
      try {
        var response = await Dio().post(url + '/login', data: {});
        loggedIn = true;
        token = response.data["token"];
        Navigator.push(
            context, MaterialPageRoute(builder: (context) => Home()));
      } catch (e) {
        print(e);
        if (e.response.statusCode == 401) {
          ScaffoldMessenger.of(context)
              .showSnackBar(const SnackBar(content: Text('Login failed')));
        }
      }
    } catch (e) {}
  }

  double xAlign;
  Color healthyColor;
  Color unhealthyInColor;

  var _chosenValue;

  @override
  void initState() {
    super.initState();
    xAlign = loginAlign;
    healthyColor = selectedColor;
    unhealthyInColor = normalColor;
  }

  @override
  Widget build(BuildContext context) {
    //controllers
    TextEditingController name = new TextEditingController();
    TextEditingController phone = new TextEditingController();
    TextEditingController email = new TextEditingController();
    TextEditingController pass = new TextEditingController();

    return Scaffold(
        appBar: AppBar(),
        body: Container(
          padding: EdgeInsets.only(left: 15, right: 15, top: 60),
          child: SingleChildScrollView(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  "welcome",
                  style: TextStyle(
                      fontSize: 35,
                      fontWeight: FontWeight.bold,
                      color: Colors.blue),
                ),
                SizedBox(
                  height: 5,
                ),
                Text(
                  "Let's get started!",
                  style: TextStyle(
                      fontSize: 15,
                      fontWeight: FontWeight.bold,
                      color: Colors.grey.shade400),
                ),
                SizedBox(
                  height: 10,
                ),
                Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  crossAxisAlignment: CrossAxisAlignment.center,
                  children: [
                    TextField(
                      controller: name,
                      decoration: InputDecoration(
                        labelText: "Name",
                        labelStyle:
                            TextStyle(fontSize: 15, color: Colors.blueGrey),
                        enabledBorder: OutlineInputBorder(
                            borderRadius: BorderRadius.circular(10),
                            borderSide:
                                BorderSide(color: Colors.blue.shade200)),
                        focusedBorder: OutlineInputBorder(
                            borderRadius: BorderRadius.circular(10),
                            borderSide:
                                BorderSide(color: Colors.blue.shade500)),
                      ),
                    ),
                    SizedBox(
                      height: 5,
                    ),
                    TextField(
                      controller: phone,
                      decoration: InputDecoration(
                        labelText: "Phone",
                        labelStyle:
                            TextStyle(fontSize: 15, color: Colors.blueGrey),
                        enabledBorder: OutlineInputBorder(
                            borderRadius: BorderRadius.circular(10),
                            borderSide:
                                BorderSide(color: Colors.blue.shade200)),
                        focusedBorder: OutlineInputBorder(
                            borderRadius: BorderRadius.circular(10),
                            borderSide:
                                BorderSide(color: Colors.blue.shade500)),
                      ),
                    ),
                    SizedBox(
                      height: 5,
                    ),
                    TextField(
                      controller: email,
                      decoration: InputDecoration(
                        labelText: "email address",
                        labelStyle:
                            TextStyle(fontSize: 15, color: Colors.blueGrey),
                        enabledBorder: OutlineInputBorder(
                            borderRadius: BorderRadius.circular(10),
                            borderSide:
                                BorderSide(color: Colors.blue.shade200)),
                        focusedBorder: OutlineInputBorder(
                            borderRadius: BorderRadius.circular(10),
                            borderSide:
                                BorderSide(color: Colors.blue.shade500)),
                      ),
                    ),
                    SizedBox(
                      height: 5,
                    ),
                    TextField(
                      controller: pass,
                      obscureText: true,
                      decoration: InputDecoration(
                        labelText: "Password",
                        labelStyle:
                            TextStyle(fontSize: 15, color: Colors.blueGrey),
                        enabledBorder: OutlineInputBorder(
                            borderRadius: BorderRadius.circular(10),
                            borderSide:
                                BorderSide(color: Colors.blue.shade200)),
                        focusedBorder: OutlineInputBorder(
                            borderRadius: BorderRadius.circular(10),
                            borderSide:
                                BorderSide(color: Colors.blue.shade500)),
                      ),
                    ),
                    SizedBox(
                      height: 15,
                    ),
                    Container(
                      padding: EdgeInsets.fromLTRB(10, 0, 10, 0),
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Text(
                            "Lets share Hub",
                            style: TextStyle(
                                fontSize: 15,
                                fontWeight: FontWeight.bold,
                                color: Colors.blueGrey),
                          ),
                          DropdownButton<String>(
                            focusColor: Colors.white,
                            value: _chosenValue,
                            //elevation: 5,
                            style: TextStyle(color: Colors.white),
                            iconEnabledColor: Colors.black,
                            items: <String>[
                              'NSBM',
                              'MORA',
                              'SLIIT',
                            ].map<DropdownMenuItem<String>>((String value) {
                              return DropdownMenuItem<String>(
                                value: value,
                                child: Text(
                                  value,
                                  style: TextStyle(color: Colors.black),
                                ),
                              );
                            }).toList(),
                            hint: Text(
                              "Please choose the Hub",
                              style: TextStyle(
                                  color: Colors.black,
                                  fontSize: 14,
                                  fontWeight: FontWeight.w500),
                            ),
                            onChanged: (String value) {
                              setState(() {
                                _chosenValue = value;
                              });
                            },
                          ),
                        ],
                      ),
                    ),
                    SizedBox(
                      height: 10,
                    ),
                    Container(
                      height: 50,
                      width: double.infinity,
                      decoration: BoxDecoration(
                          color: Colors.blue,
                          borderRadius: BorderRadius.circular(5)),
                      child: GestureDetector(
                        child: TextButton(
                          onPressed: () {
                            register();
                          },
                          child: Text("Register",
                              style: TextStyle(
                                  color: Colors.white,
                                  fontWeight: FontWeight.bold)),
                        ),
                      ),
                    ),
                  ],
                )
              ],
            ),
          ),
        ));
  }
}
