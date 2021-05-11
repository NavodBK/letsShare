import 'package:flutter/material.dart';
import 'package:dio/dio.dart';
import 'package:lets_share/MyGroupSettings.dart';
import 'globals.dart';
import 'fileview.dart';

var files = [];

class GroupFiles extends StatefulWidget {
  final groupId;
  final groupName;
  const GroupFiles({this.groupId, this.groupName});
  @override
  _GroupFilesState createState() => _GroupFilesState();
}

class _GroupFilesState extends State<GroupFiles> {
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) => getFiles()());
  }

  getFiles() async {
    print(widget.groupId);
    try {
      Dio dio = new Dio();
      dio.options.headers["authorization"] = "Bearer ${token}";
      var response = await dio.get(url + '/group/' + widget.groupId.toString());
      print(response);
      setState(() {
        files = response.data;
      });
    } catch (e) {}
  }

  FilesBodyRender() {
    if (files.length == 0) {
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
            return fileview(file: files[index]);
          },
          itemCount: files.length);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Center(child: Text(widget.groupName)),
        actions: [
          IconButton(
              icon: Icon(Icons.settings),
              onPressed: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(
                    builder: (context) => MyGroupSettings(
                      groupId: widget.groupId,
                    ),
                  ),
                );
              })
        ],
      ),
      body: FilesBodyRender(),
    );
  }
}
