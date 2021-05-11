import 'package:flutter/material.dart';
import 'package:lets_share/PublicFiles.dart';
import 'package:lets_share/login.dart';
import 'package:dio/dio.dart';
import 'globals.dart';
import 'HomeDrawer.dart';
import 'GroupFiles.dart';

var groups = null;

class Home extends StatefulWidget {
  @override
  _HomeState createState() => _HomeState();
}

class _HomeState extends State<Home> {
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) => getGroups()());
  }

  getGroups() async {
    try {
      Dio dio = new Dio();
      dio.options.headers["authorization"] = "Bearer ${token}";
      var response = await dio.get(url + '/groups/my');
      print(response);
      setState(() {
        groups = response.data;
      });
    } catch (e) {}
  }

  homeBodyRender() {
    if (groups == null) {
      print("empty");
      return Center(
        child: Container(
          padding: EdgeInsets.all(30),
          margin: EdgeInsets.all(25),
          child: Text("Nothing to see here"),
        ),
      );
    } else {
      return ListView.builder(
          itemBuilder: (ctx, index) {
            return Container(
              margin: EdgeInsets.all(10),
              padding: EdgeInsets.fromLTRB(10, 0, 10, 0),
              decoration: new BoxDecoration(color: Colors.blue[100]),
              child: ListTile(
                onTap: () async {
                  try {
                    print(groups[index]["_id"]);
                    Navigator.push(
                      ctx,
                      MaterialPageRoute(
                        builder: (context) => GroupFiles(
                            groupId: groups[index]["_id"],
                            groupName: groups[index]["name"]),
                      ),
                    );
                  } catch (e) {
                    print(e);
                  }
                },
                title: Text(groups[index]["name"]),
                trailing: Icon(Icons.navigate_next_outlined),
              ),
            );
          },
          itemCount: groups.length);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Center(child: Text("My Groups")),
        actions: [
          IconButton(
            icon: const Icon(Icons.logout),
            tooltip: 'Logout',
            onPressed: () async {
              try {
                Dio dio = new Dio();
                dio.options.headers["authorization"] = "Bearer ${token}";
                var response = await dio.post(url + '/users/logout', data: {});
                print(response);
                Navigator.push(
                    context, MaterialPageRoute(builder: (context) => login()));
                token = '';
                loggedIn = false;
              } catch (e) {
                print(e);
              }
            },
          ),
        ],
      ),
      drawer: HomeDrawer(),
      body: homeBodyRender(),
    );
  }
}
