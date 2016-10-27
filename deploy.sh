#!/bin/bash
rm -r dist && ng build --prod && firebase deploy