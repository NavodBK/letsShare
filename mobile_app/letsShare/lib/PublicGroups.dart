import 'package:flutter/material.dart';
import 'package:lets_share/home.dart';

import 'PublicGroupDetails.dart';

import 'package:dio/dio.dart';

import 'globals.dart';

var groups = null;

class PublicGroups extends StatefulWidget {
  @override
  _PublicGroupsState createState() => _PublicGroupsState();
}

class _PublicGroupsState extends State<PublicGroups> {
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) => getGroups()());
  }

  getGroups() async {
    try {
      Dio dio = new Dio();
      dio.options.headers["authorization"] = "Bearer ${token}";
      var response = await dio.get(url + '/groups');
      print(response);
      setState(() {
        groups = response.data;
      });
    } catch (e) {}
  }

  PublicGroupsBodyRender() {
    if (groups == null) {
      print("empty");
      return Text("Nothing to see here");
    } else {
      return ListView.builder(
          itemBuilder: (ctx, index) {
            return Container(
              margin: EdgeInsets.all(10),
              padding: EdgeInsets.fromLTRB(10, 0, 10, 0),
              decoration: new BoxDecoration(color: Colors.blue[100]),
              child: ListTile(
                  title: Text(groups[index]["name"]),
                  trailing: TextButton(
                    child: Text("join"),
                    onPressed: () async {
                      print(groups[index]["_id"]);
                      print(token);
                      try {
                        Dio dio = new Dio();
                        dio.options.headers["authorization"] =
                            "Bearer ${token}";
                        var response = await dio.post(
                          url + '/groups/join',
                          data: {
                            "groupId": groups[index]["_id"],
                          },
                        );
                        Navigator.push(ctx,
                            MaterialPageRoute(builder: (context) => Home()));
                      } catch (e) {
                        print(e);
                      }
                    },
                  )),
            );
          },
          itemCount: groups.length);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Center(child: Text("Public Groups")),
        actions: [
          SizedBox(
            width: 35,
          )
        ],
      ),
      body: PublicGroupsBodyRender(),
    );
  }
}
