import 'package:flutter/material.dart';
import 'package:dio/dio.dart';
import 'package:lets_share/globals.dart';
import 'package:lets_share/login.dart';
import 'globals.dart';

class HubSelect extends StatefulWidget {
  @override
  _HubSelectState createState() => _HubSelectState();
}

var hubs = null;

class _HubSelectState extends State<HubSelect> {
  void next() {
    // Navigator.push(context, MaterialPageRoute(builder: (context) => login()));
    getHubs();
  }

  var hubs;
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) => getHubs());
  }

  void getHubs() async {
    try {
      var response = await Dio().get(mainUrl + "/hubs");

      print(response);
      setState(() {
        hubs = response.data;
      });
    } catch (e) {
      print(e);
    }
  }

  selectHubBodyRender() {
    if (hubs == null) {
      return Center(
        child: Text("Loading"),
      );
    } else {
      return Container(
        decoration:
            BoxDecoration(border: Border.all(color: Colors.lightBlue[100])),
        width: double.infinity,
        height: 400,
        child: Center(
          child: ListView.builder(
            itemCount: hubs.length,
            itemBuilder: (ctx, index) {
              return Container(
                decoration: BoxDecoration(
                    border: Border.all(color: Colors.blueAccent),
                    borderRadius: BorderRadius.circular(10)),
                margin: EdgeInsets.all(20),
                padding: EdgeInsets.fromLTRB(5, 5, 5, 5),
                width: double.infinity,
                height: 50,
                child: Material(
                  child: InkWell(
                    onTap: () {
                      url = "http://" + hubs[index]["url"].toString();
                      Navigator.push(
                        context,
                        MaterialPageRoute(
                          builder: (context) => login(),
                        ),
                      );
                    },
                    child: Container(
                      child: Center(
                        child: Text(
                          hubs[index]["name"],
                          style: TextStyle(
                              fontSize: 20, fontWeight: FontWeight.bold),
                        ),
                      ),
                    ),
                  ),
                ),
              );
            },
          ),
        ),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Column(
        mainAxisAlignment: MainAxisAlignment.spaceAround,
        children: [
          Container(
            margin: EdgeInsets.fromLTRB(0, 50, 0, 20),
            child: Text(
              "Lets Share",
              style: TextStyle(fontSize: 50, color: Colors.lightBlue[900]),
            ),
          ),
          Container(
            margin: EdgeInsets.fromLTRB(0, 15, 0, 30),
            child: Image(
              width: 180,
              image: AssetImage('assets/img/logo.png'),
            ),
          ),
          Container(
            child: Text(
              "Remember! Sharing is caring",
              style: TextStyle(color: Colors.purple, fontSize: 20),
            ),
          ),
          Container(
            margin: EdgeInsets.only(top: 20),
            child: Text(
              "Please select your hub to continue",
              style: TextStyle(color: Colors.purple[200], fontSize: 15),
            ),
          ),
          selectHubBodyRender(),
        ],
      ),
    );
  }
}
