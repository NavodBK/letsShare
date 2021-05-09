import 'package:flutter/material.dart';

groupTab() {
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
          print("test");
        },
        child: Container(
          child:
              Row(mainAxisAlignment: MainAxisAlignment.spaceBetween, children: [
            Text(
              "Group name",
            ),
            Icon(Icons.arrow_right)
          ]),
        ),
      ),
    ),
  );
}
