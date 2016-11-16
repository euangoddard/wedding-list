#!/bin/bash
rm -r dist && ng build --aot --prod && firebase deploy
