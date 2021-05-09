import 'package:flutter/material.dart';
import 'package:dio/dio.dart';
import 'package:lets_share/register.dart';
import 'globals.dart';
import 'login.dart';

TextEditingController name = new TextEditingController();
TextEditingController phoneNum = new TextEditingController();
TextEditingController email = new TextEditingController();
TextEditingController pass = new TextEditingController();

class Profile extends StatefulWidget {
  @override
  _ProfileState createState() => _ProfileState();
}

class _ProfileState extends State<Profile> {
  String hubName = "loading";
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) => getUserDetails()());
  }

  getUserDetails() async {
    try {
      Dio dio = new Dio();
      dio.options.headers["authorization"] = "Bearer ${token}";
      var response = await dio.get(url + '/user/me');
      print(response.data);

      setState(() {
        name.text = response.data["name"];
        phoneNum.text = response.data["phone"].toString();
        email.text = response.data["email"];
        hubName = response.data["hub"];
      });
    } catch (e) {}
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(),
      body: SingleChildScrollView(
        child: Center(
          child: Container(
            padding: EdgeInsets.all(20),
            child: Column(
              children: [
                SizedBox(
                  height: 10,
                ),
                Container(
                  child: Image(
                    width: 180,
                    image: AssetImage('assets/img/user.png'),
                  ),
                ),
                SizedBox(
                  height: 20,
                ),
                TextField(
                  controller: name,
                  decoration: InputDecoration(
                    labelText: "Name",
                    labelStyle: TextStyle(fontSize: 15, color: Colors.blueGrey),
                    enabledBorder: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(10),
                        borderSide: BorderSide(color: Colors.blue.shade200)),
                    focusedBorder: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(10),
                        borderSide: BorderSide(color: Colors.blue.shade500)),
                  ),
                ),
                SizedBox(
                  height: 5,
                ),
                TextField(
                  controller: phoneNum,
                  decoration: InputDecoration(
                    labelText: "Phone",
                    labelStyle: TextStyle(fontSize: 15, color: Colors.blueGrey),
                    enabledBorder: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(10),
                        borderSide: BorderSide(color: Colors.blue.shade200)),
                    focusedBorder: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(10),
                        borderSide: BorderSide(color: Colors.blue.shade500)),
                  ),
                ),
                SizedBox(
                  height: 5,
                ),
                TextField(
                  controller: email,
                  decoration: InputDecoration(
                    labelText: "email address",
                    labelStyle: TextStyle(fontSize: 15, color: Colors.blueGrey),
                    enabledBorder: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(10),
                        borderSide: BorderSide(color: Colors.blue.shade200)),
                    focusedBorder: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(10),
                        borderSide: BorderSide(color: Colors.blue.shade500)),
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
                    labelStyle: TextStyle(fontSize: 15, color: Colors.blueGrey),
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
                      Text(hubName),
                    ],
                  ),
                ),
                SizedBox(
                  height: 20,
                ),
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    TextButton(
                      onPressed: () async {
                        try {
                          Dio dio = new Dio();
                          dio.options.headers["authorization"] =
                              "Bearer ${token}";
                          var response = await dio.get(url + '/user/delete');
                          Navigator.push(context,
                              MaterialPageRoute(builder: (context) => login()));
                        } catch (e) {}
                      },
                      child: Text(
                        "Delete",
                        style: TextStyle(color: Colors.white),
                      ),
                      style: ButtonStyle(
                          backgroundColor:
                              MaterialStateProperty.all(Colors.red)),
                    ),
                    TextButton(
                      onPressed: () async {
                        try {
                          Dio dio = new Dio();
                          dio.options.headers["authorization"] =
                              "Bearer ${token}";
                          var response = await dio.patch(url + '/user/update',
                              data: {
                                "name": name.text,
                                "email": int.parse(email.text),
                                "phone": phone.text
                              });
                        } catch (e) {}
                      },
                      child: Text("Update"),
                      style: ButtonStyle(
                          backgroundColor:
                              MaterialStateProperty.all(Colors.cyan[100])),
                    )
                  ],
                )
              ],
            ),
          ),
        ),
      ),
    );
  }
}
