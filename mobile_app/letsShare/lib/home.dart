import 'package:flutter/material.dart';
import 'package:lets_share/GroupTab.dart';
import 'package:lets_share/login.dart';
import 'package:dio/dio.dart';

import 'globals.dart';
import 'HomeDrawer.dart';

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
      groups = response.data;
    } catch (e) {}
  }

  homeBodyRender() {
    if (groups == null) {
      print("empty");
      return Text("Nothing to see here");
    } else {
      return ListView.builder(
          itemBuilder: (ctx, index) {
            return ListTile(
              title: Text(index.toString()),
            );
          },
          itemCount: groups.length);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Center(child: Text("Groups")),
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
