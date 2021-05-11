import 'package:flutter/material.dart';

drawerButton(ctx, redirect, buttonText) {
  return Container(
    padding: EdgeInsets.fromLTRB(20, 5, 20, 5),
    width: double.infinity,
    child: TextButton(
      style: ButtonStyle(
          backgroundColor: MaterialStateProperty.all(Colors.blue[200])),
      onPressed: () {
        Navigator.push(ctx, MaterialPageRoute(builder: (context) => redirect));
      },
      child: Text(
        buttonText,
        style: TextStyle(color: Colors.white),
      ),
    ),
  );
}
