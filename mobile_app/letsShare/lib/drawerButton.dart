import 'package:flutter/material.dart';

drawerButton(ctx, redirect, buttonText) {
  return Container(
    padding: EdgeInsets.all(20),
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
