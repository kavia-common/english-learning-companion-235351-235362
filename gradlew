#!/usr/bin/env sh
# Workspace-level Gradle wrapper shim for mobile workspace checks.
if [ -f "./frontend_learning_app/gradlew" ]; then
  sh "./frontend_learning_app/gradlew" "$@"
  exit $?
fi

if [ -f "./frontend_learning_app/gradlew.sh" ]; then
  sh "./frontend_learning_app/gradlew.sh" "$@"
  exit $?
fi

echo "mobile workspace gradlew shim: no frontend gradle wrapper found; nothing to do."
exit 0
