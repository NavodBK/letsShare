import 'package:flutter/material.dart';

class PublicGroupDetails extends StatelessWidget {
  final String data;
  PublicGroupDetails(this.data);
  @override
  Widget build(BuildContext context) {
    return Text(data);
  }
}
