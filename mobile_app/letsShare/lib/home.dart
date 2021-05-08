import 'package:flutter/material.dart';
import 'package:lets_share/login.dart';

import 'globals.dart';

class Home extends StatefulWidget {
  @override
  _HomeState createState() => _HomeState();
}

class _HomeState extends State<Home> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        leading: Container(),
        actions: [
          IconButton(
            icon: const Icon(Icons.logout),
            tooltip: 'Logout',
            onPressed: () {
              token = '';
              loggedIn = false;
              Navigator.push(
                  context, MaterialPageRoute(builder: (context) => login()));
            },
          ),
        ],
      ),
      body: Text(token),
    );
  }
}
