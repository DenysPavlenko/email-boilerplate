const mailchimpFooter = (width) => {
return `
<table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" style="border-collapse: collapse;" mc:hideable="mc-badge">
	<style>.badge a img{display: inline-block !important}</style>
	<tr>
		<td align="center" class="body-bg">
			<table class="wrapper" align="center" border="0" cellpadding="0" cellspacing="0" style="width:${width}">
				<tr>
					<td align="center" class="mc-badge-bg">
						<table class="container" align="center" border="0" cellpadding="0" cellspacing="0">
							<tr><td height="31"></td></tr>
							<tr><td align="center" style="color:#000;text-align: center;" class="badge">*|IF:REWARDS|* *|HTML:REWARDS|* *|END:IF|*</td></tr>
							<tr><td height="31"></td></tr>
						</table>
					</td>
				</tr>
			</table>
		</td>
	</tr>
</table>
`
}

module.exports = mailchimpFooter;