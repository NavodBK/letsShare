import 'package:flutter/material.dart';

import 'drawerButton.dart';
import 'profile.dart';

class HomeDrawer extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Drawer(
      child: SafeArea(
        child: Center(
          child: Container(
            child: Column(
              children: [
                SizedBox(
                  height: 20,
                ),
                drawerButton(context, Profile(), "Profile")
              ],
            ),
          ),
        ),
      ),
    );
  }
}
