import 'package:flutter/material.dart';
import 'package:lets_share/PublicFiles.dart';

import 'drawerButton.dart';
import 'profile.dart';
import 'PublicGroups.dart';

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
                drawerButton(context, Profile(), "Profile"),
                drawerButton(context, PublicFiles(), "Public Files"),
                drawerButton(context, PublicGroups(), "Public Groups")
              ],
            ),
          ),
        ),
      ),
    );
  }
}
