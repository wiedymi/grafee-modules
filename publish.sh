#!/bin/bash

function logger {
  echo "--- $1"
}

logger 'run prepare packages'
yarn prepare

current_branch="$(git branch | grep \* | cut -d ' ' -f2-)"
if [ $current_branch != 'develop' ]; then
  read -p "Merge current branch in develop (y/n)?" merge_current_branch

  logger 'move branch to develop'
  git checkout develop
  logger 'pull changes'
  git pull

  case "$merge_current_branch" in
    y|Y )
      logger "merge $current_branch into develop"
      git merge "$current_branch"
    ;;
  esac

  if [ $current_branch != 'master' ]; then
    read -p "Delete local and remote branch $current_branch (y/n)?" delete_current_branch

    case "$delete_current_branch" in
      y|Y )
        logger "delete local and remote $current_branch"
        git push origin --delete "$current_branch"
      ;;
    esac
  fi
fi

logger 'push develop changes'
git push

logger 'move branch to master'
git checkout master

logger 'pull changes'
git pull

logger 'merge develop in master'
git merge develop

logger 'run lerna publish'
lerna publish --conventional-commits

logger 'move branch to develop'
git checkout develop

logger 'merge branch master'
git merge master

logger 'push develop merge'
git push