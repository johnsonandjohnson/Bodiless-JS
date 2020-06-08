/**
 * Copyright © 2019 Johnson & Johnson
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from 'react';
import { Helmet } from 'react-helmet';

export default class IndexPage extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Helmet>
          <html className="class1 class2" data-widget="globalScriptsWidget" />
          <body className="class3 class4" />
          <base href="https://localhost/" />
          <link type="text/css" rel="stylesheet" href="https://localhost/test1.css" />
          {/*[if lt IE 9]>
    <link type="text/css" rel="stylesheet" href="https://localhost/conditional.css" media="all" />
    <![endif]*/}
          <link type="text/css" rel="stylesheet" href="https://localhost/test2.css" />
          <link type="text/css" rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" />
          <meta name="MobileOptimized" content="width" />
          <meta name="pagetype" content="home" />
          <script innerHTML="var a = 4;" />
          <style cssText=".wrapper { max-width: 980px; }" />
        </Helmet>
        ;
      </React.Fragment>
    );
  }
}
