<?xml version = "1.0"?>

<!-- Fig. 20.31 : sorting.xsl                      -->
<!-- Transformation of Book information into XHTML -->

<xsl:stylesheet version = "1.0" 
   xmlns:xsl = "http://www.w3.org/1999/XSL/Transform">

   <xsl:output method = "html" omit-xml-declaration = "no" 
      doctype-system = "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd" 
      doctype-public = "-//W3C//DTD XHTML 1.0 Strict//EN"/>

   <xsl:template match = "/">
      <html xmlns = "http://www.w3.org/1999/xhtml">
         <xsl:apply-templates/>
      </html>
   </xsl:template>
   
   <xsl:template match = "book">
      <head>
         <title>ISBN <xsl:value-of select = "@isbn"/> - 
            <xsl:value-of select = "title"/></title>
      </head>

      <body>
         <h1><xsl:value-of select = "title"/></h1>

         <h2>by <xsl:value-of select = "author/lastName"/>,
            <xsl:value-of select = "author/firstName"/></h2>

         <table border = "1">
            <xsl:for-each select = "chapters/frontMatter/*">
               <tr>
                  <td align = "right">
                     <xsl:value-of select = "name()"/>
                  </td>

                  <td>
                    ( <xsl:value-of select = "@pages"/> pages )
                  </td>
               </tr>
            </xsl:for-each>

            <xsl:for-each select = "chapters/chapter">
               <xsl:sort select = "@number" data-type = "number" 
                    order = "ascending"/>
               <tr>
                  <td align = "right">
                     Chapter <xsl:value-of select = "@number"/>
                  </td>

                  <td>
                     <xsl:value-of select = "text()"/>
                     ( <xsl:value-of select = "@pages"/> pages )
                  </td>
               </tr>
            </xsl:for-each>

            <xsl:for-each select = "chapters/appendix">
               <xsl:sort select = "@number" data-type = "text" 
                    order = "ascending"/>
               <tr>
                  <td align = "right">
                     Appendix <xsl:value-of select = "@number"/>
                  </td>

                  <td>
                     <xsl:value-of select = "text()"/>
                     ( <xsl:value-of select = "@pages"/> pages )
                  </td>
               </tr>
            </xsl:for-each>
         </table>

         <br />Pages: 
            <xsl:variable name = "pagecount"
               select = "sum(chapters//*/@pages)"/>
            <xsl:value-of select = "$pagecount"/>
         <br />Media Type: <xsl:value-of select = "media/@type"/>
      </body>
   </xsl:template>

</xsl:stylesheet>

<!--
**************************************************************************
* (C) Copyright 1992-2004 by Deitel & Associates, Inc. and               *
* Pearson Education, Inc. All Rights Reserved.                           *
*                                                                        *
* DISCLAIMER: The authors and publisher of this book have used their     *
* best efforts in preparing the book. These efforts include the          *
* development, research, and testing of the theories and programs        *
* to determine their effectiveness. The authors and publisher make       *
* no warranty of any kind, expressed or implied, with regard to these    *
* programs or to the documentation contained in these books. The authors *
* and publisher shall not be liable in any event for incidental or       *
* consequential damages in connection with, or arising out of, the       *
* furnishing, performance, or use of these programs.                     *
**************************************************************************
-->