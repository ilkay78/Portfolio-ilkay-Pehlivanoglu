<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

  <xsl:output method="html" encoding="UTF-8" indent="yes"/>

  <xsl:template match="/">
    <html>
      <head>
        <title>Kontaktformular – Übersicht</title>
      <link rel="stylesheet" type="text/css" href="./Webdesign-css/contact-form.css"/>
      </head>

      <body>
        <h2>Kontaktdaten erfolgreich gesendet</h2>

        <table>
          <tr>
            <th>Name</th>
            <td><xsl:value-of select="kontaktformular/name"/></td>
          </tr>
          <tr>
            <th>Nachname</th>
            <td><xsl:value-of select="kontaktformular/surname"/></td>
          </tr>
          <tr>
            <th>Adresse</th>
            <td><xsl:value-of select="kontaktformular/address"/></td>
          </tr>
          <tr>
            <th>Postleitzahl</th>
            <td><xsl:value-of select="kontaktformular/plz"/></td>
          </tr>
          <tr>
            <th>Bundesland</th>
            <td><xsl:value-of select="kontaktformular/city"/></td>
          </tr>
          <tr>
            <th>Telefon</th>
            <td><xsl:value-of select="kontaktformular/phone"/></td>
          </tr>
          <tr>
            <th>E-Mail</th>
            <td><xsl:value-of select="kontaktformular/email"/></td>
          </tr>
          <tr>
            <th>Kommentar</th>
            <td><xsl:value-of select="kontaktformular/comment"/></td>
          </tr>
          <tr>
            <th>Datum</th>
            <td><xsl:value-of select="kontaktformular/datum"/></td>
          </tr>
        </table>

      </body>
    </html>
  </xsl:template>

</xsl:stylesheet>
