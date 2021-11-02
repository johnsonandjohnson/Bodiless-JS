#!/bin/bash
###
 # Copyright © 2019 Johnson & Johnson
 #
 # Licensed under the Apache License, Version 2.0 (the "License");
 # you may not use this file except in compliance with the License.
 # You may obtain a copy of the License at
 # http:##www.apache.org#licenses#LICENSE-2.0
 # Unless required by applicable law or agreed to in writing, software
 # distributed under the License is distributed on an "AS IS" BASIS,
 # WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 # See the License for the specific language governing permissions and
 # limitations under the License.
 ##


function listBranchWithDescription() {
  branches=`git branch --list $1`

  # requires git > v.1.7.9

  # you can set branch's description using command
  # git branch --edit-description
  # this opens the configured text editor, enter message, save and exit
  # if one editor does not work (for example Sublime does not work for me)
  # try another one, like vi

  # you can see branch's description using
  # git config branch.<branch name>.description

  while read -r branch; do
    # git marks current branch with "* ", remove it
    clean_branch_name=${branch//\*\ /}
    # replace colors
    clean_branch_name=`echo $clean_branch_name | tr -d '[:cntrl:]' | sed -E "s/\[([0-9]{1,2}(;[0-9]{1,2})?)?[m|K]//g"`
    # replace symbolic-ref like `HEAD -> main`
    clean_branch_name=`echo $clean_branch_name | sed -E "s/^.+ -> //g"`

    description=`git config branch.$clean_branch_name.description`
    # take out all returns fornow
    description="${description//$'\n'/<br />}"
    # get the last commit
    commit=`git log -1 --pretty=%B $clean_branch_name`
    if [ "${branch::1}" == "*" ]; then
      printf "1 || $clean_branch_name || $description || $commit\n"
    else
      printf "0 || $clean_branch_name || $description || $commit\n"
    fi
  done <<< "$branches"

  # example output
  # $ ./branches.sh
  # * main          this is main branch
  # one             this is simple branch for testing
}

# If git path is defined on server, change pwd to git path.
if [[ ! -z "${APP_GIT_PATH}" && -d "${APP_GIT_PATH}" ]]; then
  cd $APP_GIT_PATH
fi

# @see [git-branch](https://git-scm.com/docs/git-branch)
if [[ "$@" = "" ]]; then
  listBranchWithDescription "--color"
elif [[ "$@" =~ "--color" || "$@" =~ "--no-color" ]]; then
  listBranchWithDescription "$@"
else
  branch_operation_result=`git branch $@`
  printf "$branch_operation_result\n"
fi
