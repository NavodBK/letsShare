import 'package:flutter/material.dart';
import 'package:dio/dio.dart';
import 'globals.dart';
import 'fileview.dart';

var files = null;

class PublicFiles extends StatefulWidget {
  @override
  _PublicFilesState createState() => _PublicFilesState();
}

class _PublicFilesState extends State<PublicFiles> {
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) => gePublicFiles()());
  }

  gePublicFiles() async {
    try {
      Dio dio = new Dio();
      dio.options.headers["authorization"] = "Bearer ${token}";
      var response = await dio.get(url + '/files');
      print(response);
      setState(() {
        files = response.data;
      });
    } catch (e) {}
  }

  PublicFilesBodyRender() {
    if (files == null) {
      print("empty");
      return Text("Nothing to see here");
    } else {
      print(files);
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
        title: Center(child: Text("Public Files")),
        actions: [
          SizedBox(
            width: 35,
          )
        ],
      ),
      body: PublicFilesBodyRender(),
    );
  }
}
