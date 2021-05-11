import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'globals.dart';

class MyGroupSettings extends StatefulWidget {
  final groupId;

  MyGroupSettings({this.groupId});

  @override
  _MyGroupSettingsState createState() => _MyGroupSettingsState();
}

class _MyGroupSettingsState extends State<MyGroupSettings> {
  var groupData;
  var groupName = "Loading...";
  var members = "Loading...";
  var files = "Loading...";
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) => getData()());
  }

  getData() async {
    try {
      Dio dio = new Dio();
      dio.options.headers["authorization"] = "Bearer ${token}";
      var response = await dio.get(url + '/group/details/' + widget.groupId);
      print(response);
      setState(() {
        groupData = response.data;
        groupName = groupData["thisGroup"]["name"];
        members = groupData["thisGroup"]["users"].length.toString();
        files = groupData["files"].length.toString();
      });
    } catch (e) {
      print(e);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Center(
          child: Text("Settings"),
        ),
        actions: [
          SizedBox(
            width: 45,
          )
        ],
      ),
      body: Container(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Container(
              child: Image(
                width: 180,
                image: AssetImage('assets/img/group.png'),
              ),
            ),
            Container(
              height: 50,
              margin: EdgeInsets.fromLTRB(50, 2, 50, 2),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(
                    "Group name :",
                    style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
                  ),
                  Text(
                    groupName,
                    style: TextStyle(fontSize: 20),
                  ),
                ],
              ),
            ),
            Container(
              height: 50,
              margin: EdgeInsets.fromLTRB(50, 2, 50, 2),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text("Members :",
                      style:
                          TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),
                  Text(
                    members,
                    style: TextStyle(fontSize: 20),
                  ),
                ],
              ),
            ),
            Container(
              height: 50,
              margin: EdgeInsets.fromLTRB(50, 2, 50, 2),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text("Files :",
                      style:
                          TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),
                  Text(
                    files,
                    style: TextStyle(fontSize: 20),
                  ),
                ],
              ),
            ),
            TextButton(
                onPressed: () async {
                  try {
                    Dio dio = new Dio();
                    dio.options.headers["authorization"] = "Bearer ${token}";
                    var response =
                        await dio.get(url + '/group/details/' + widget.groupId);
                    print(response);
                    setState(() {
                      groupData = response.data;
                      groupName = groupData["thisGroup"]["name"];
                      members =
                          groupData["thisGroup"]["users"].length.toString();
                      files = groupData["files"].length.toString();
                    });
                  } catch (e) {
                    print(e);
                  }
                },
                child: Text(
                  "Leave the group",
                  style: TextStyle(color: Colors.red),
                ))
          ],
        ),
      ),
    );
  }
}
