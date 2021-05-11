import 'package:flutter/material.dart';
import 'package:dio/dio.dart';
import 'package:lets_share/login.dart';

const mainServer = "http://127.0.0.1:3001";

class HubSelect extends StatefulWidget {
  @override
  _HubSelectState createState() => _HubSelectState();
}

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
      var response = await Dio().get(mainServer + "/hubs");
      hubs = response;
      print(response);
      // Navigator.push(
      //   context,
      //   MaterialPageRoute(
      //     builder: (context) => login(),
      //   ),
      // );
    } catch (e) {
      print(e);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Text(hubs.toString()),
      floatingActionButton: FloatingActionButton(
        child: Text("next"),
        onPressed: next,
      ),
    );
  }
}
