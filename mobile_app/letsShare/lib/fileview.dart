import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:flutter_downloader/flutter_downloader.dart';
import 'package:lets_share/globals.dart';

fileview({file}) {
  return Container(
    margin: EdgeInsets.all(10),
    padding: EdgeInsets.fromLTRB(10, 0, 10, 0),
    decoration: new BoxDecoration(color: Colors.blue[100]),
    child: Column(
      children: [
        Center(
          child: Container(
            child: Text(
              file["name"],
            ),
            padding: EdgeInsets.all(10),
          ),
        ),
        Container(
          padding: EdgeInsets.fromLTRB(0, 5, 0, 10),
          decoration: new BoxDecoration(
              border: Border(
                  top:
                      BorderSide(width: 5.0, color: Colors.lightBlue.shade50))),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceAround,
            children: [
              Column(
                children: [
                  Padding(
                    padding: const EdgeInsets.all(8.0),
                    child: Text(
                      "Downloads : " + file["downloads"].toString(),
                    ),
                  ),
                  Padding(
                    padding: const EdgeInsets.all(8.0),
                    child: Text(
                      "Rating : " + file["rating"].toString(),
                    ),
                  ),
                ],
              ),
              IconButton(
                  icon: Icon(Icons.arrow_downward), onPressed: () async {}),
              IconButton(
                  icon: Icon(Icons.arrow_upward), onPressed: () async {}),
              IconButton(
                  icon: Icon(Icons.download_outlined),
                  onPressed: () async {
                    try {
                      Dio dio = new Dio();
                      print("try");
                      dio.options.headers["authorization"] = "Bearer ${token}";
                      var response = await dio.download(
                          url, '/files/download/' + file["id"]);
                      print(response);
                    } catch (e) {}
                  })
            ],
          ),
        )
      ],
    ),
  );
}
