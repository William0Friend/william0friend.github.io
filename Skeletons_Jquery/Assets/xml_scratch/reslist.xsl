<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
	
<xsl:template match="/">
   <xsl:apply-templates select="//UNIT" />
		
<TABLE width="100%">

<TR>
<TD>
<TABLE border="2">
   <CAPTION><H2>Available Resources</H2></CAPTION>
   <THEAD>
   <TR>
       <TH>Resource ID</TH>
       <TH>Resource Type</TH>
       <TH>Update Rate (est.)</TH>
       <TH>Description</TH>
   </TR>
   </THEAD>

<xsl:apply-templates select="//RESOURCE" />

</TABLE>

</TD>
</TR>
</TABLE>	

<BR></BR>

<TABLE border="2">
   <CAPTION><H2>Associated Links</H2></CAPTION>
   <THEAD>
   <TR>
       <TH>Organization</TH>
       <TH>Location</TH>
       <TH>Relationship</TH>
   </TR>
   </THEAD>

<xsl:apply-templates select="//LINK" />

</TABLE>

		
</xsl:template>


<xsl:template match="UNIT">
   <H1 style="text-align:center; background-color:blue; color:white">
        <xsl:value-of select="UNIT_NAME"/> at <xsl:value-of select="UNIT_LOC"/></H1>
   <H2 style="text-align:center; background-color:red; color:white">
        Send Subscriptions to:  <xsl:value-of select="UNIT_EMAIL"/></H2> 
</xsl:template>


<xsl:template match="RESOURCE">
   <TR>
	<TD>
         <A> <xsl:attribute name="HREF">
                 <xsl:value-of select="PATH"/>
                 <xsl:value-of select="NAME"/>
             </xsl:attribute>
             <xsl:value-of select="RES_ID"/>
        </A>
	</TD>	
	<TD><xsl:value-of select="RES_TYPE"/></TD>	
	<TD><xsl:value-of select="UPDATED"/></TD>		
	<TD><xsl:value-of select="DESCRIPTION"/></TD>				
   </TR>
</xsl:template>

<xsl:template match="LINK">
   <TR>
        <TD>
         <A> <xsl:attribute name="HREF">
                 <xsl:value-of select="HREF"/>
             </xsl:attribute>
             <xsl:value-of select="ORG"/>
         </A>
        </TD>	
        <TD><xsl:value-of select="ORG_LOC"/></TD>	
        <TD><xsl:value-of select="DESCRIPTION"/></TD>	
   </TR>
</xsl:template>


</xsl:stylesheet>