(()=>{window.EditAsset=class{constructor(){this.make_code_field_group(),this.add_attachment_popover(),this.set_code_editor_height(),this.render_preview(),this.add_attachment_handler(),this.set_listeners(),this.create_comment_box(),this.make_title_editable(),this.render_sidebar_diff()}make_code_field_group(){this.code_field_group=new frappe.ui.FieldGroup({fields:[{fieldname:"type",fieldtype:"Select",default:"Markdown",options:`Markdown
Rich Text`},{fieldtype:"Column Break"},{fieldname:"attachment_controls",fieldtype:"HTML",options:this.get_attachment_controls_html(),depends_on:'eval:doc.type=="Markdown"'},{fieldtype:"Section Break"},{fieldname:"code_html",fieldtype:"Text Editor",default:$(".wiki-content-html").html(),depends_on:'eval:doc.type=="Rich Text"'},{fieldname:"code_md",fieldtype:"Code",options:"Markdown",wrap:!0,max_lines:1/0,min_lines:20,default:$(".wiki-content-md").html().replaceAll("&gt;",">"),depends_on:'eval:doc.type=="Markdown"'}],body:$(".wiki-write").get(0)}),this.code_field_group.make(),$(".wiki-write .form-section:last").removeClass("empty-section")}get_attachment_controls_html(){return`
			<div class="attachment-controls">
				<div class="show-attachments" tabindex="-1" data-trigger="focus">
					${this.get_show_uploads_svg()}
					<span class="number">0</span> attachments
				</div>
				<div class="add-attachment-wiki">
					<span class="btn">
						${this.get_upload_image_svg()}
						Upload Attachment
					</span>
				</div>
			</div>
		`}get_show_uploads_svg(){return`<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M12.6004 6.68841L7.6414 11.5616C6.23259 12.946 3.8658 12.946 2.45699 11.5616C1.04819 10.1772
			1.04819 7.85132 2.45699 6.4669L6.85247 2.14749C7.86681 1.15071 9.44467 1.15071 10.459 2.14749C11.4733
			3.14428 11.4733 4.69483 10.459 5.69162L6.40165 9.62339C5.83813 10.1772 4.93649 10.1772 4.42932 9.62339C3.8658
			9.06962 3.8658 8.18359 4.42932 7.68519L7.81045 4.36257" stroke="#2D95F0" stroke-miterlimit="10" stroke-linecap="round"/>
		</svg>`}get_upload_image_svg(){return`<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M8 14.5C11.5899 14.5 14.5 11.5899 14.5 8C14.5 4.41015 11.5899 1.5 8 1.5C4.41015 1.5 1.5 4.41015 1.5 8C1.5 11.5899
			 4.41015 14.5 8 14.5Z" stroke="var(--icon-stroke)" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
			<path d="M8 4.75V11.1351" stroke="var(--icon-stroke)" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
			<path d="M5.29102 7.45833L7.99935 4.75L10.7077 7.45833" stroke="var(--icon-stroke)" stroke-miterlimit="10" stroke-linecap="round"
			stroke-linejoin="round"/>
		</svg>`}add_attachment_popover(){$(".show-attachments").popover({placement:"bottom",content:()=>this.build_attachment_table(),html:!0})}build_attachment_table(){var e=$('<div class="wiki-attachment"></div>');e.empty();var t=$(this.get_attachment_table_header_html()).appendTo(e);if(!this.attachments||!this.attachments.length)return"No attachments uploaded";let i=a=>a.split("/").pop().split(".").slice(0,-1).join(".").replaceAll("_"," ").replaceAll("-"," ");return this.attachments.forEach(a=>{let s=$("<tr></tr>").appendTo(t.find("tbody"));$(`<td>${a.file_name}</td>`).appendTo(s),$(`<td>
			<a class="btn btn-default btn-xs btn-primary-light text-nowrap copy-link" data-link="![${i(a.file_url)}](${a.file_url})" data-name = "${a.file_name}" >
				Copy Link
			</a>
			</td>`).appendTo(s),$(`<td>

			<a class="btn btn-default btn-xs  center delete-button"  data-name = "${a.file_name}" >
			<svg class="icon icon-sm"><use xlink:href="#icon-delete"></use></svg>

			</a>
			</td>`).appendTo(s)}),e}get_attachment_table_header_html(){return`<table class="table  attachment-table" ">
			<tbody></tbody>
		</table>`}set_code_editor_height(){setTimeout(()=>{let e=this.code_field_group.get_field("code_md");e.expanded=!this.expanded,e.refresh_height(),e.toggle_label()},120)}raise_patch(e=!1){var t={};let i=$(".doc-sidebar .web-sidebar").get(0).dataset.name;t[i]=[];let a=$($(".doc-sidebar .web-sidebar").get(0)).children(".sidebar-items").children("ul").not(".hidden").children("li");a.each(d=>{!a[d].dataset.name||t[i].push({name:a[d].dataset.name,type:a[d].dataset.type,new:a[d].dataset.new,title:a[d].dataset.title,group_name:a[d].dataset.groupName})}),$('.doc-sidebar [data-type="Wiki Sidebar"]').each(function(){let d=$(this).get(0).dataset.groupName;t[d]=[];let l=$(this).children("ul").children("li");l.each(c=>{!l[c].dataset.name||t[d].push({name:l[c].dataset.name,type:l[c].dataset.type,new:l[c].dataset.new,title:l[c].dataset.title,group_name:l[c].dataset.groupName})})});var s=this,o=[];let n=$(".edit-title span").text();o.push({fieldname:"edit_message",fieldtype:"Text",label:"Message",default:wikiPagePatchMessage!="{{ message }}"?wikiPagePatchMessage:$('[name="new"]').val()?`Add new page: ${n}`:`Edited ${n}`,mandatory:1},{fieldname:"sidebar_edited",fieldtype:"Check",label:"I updated the sidebar",default:$('[name="new"]').val()?1:0});let r=new frappe.ui.Dialog({fields:o,title:__("Please describe your changes"),primary_action_label:__("Submit Changes"),primary_action:function(){frappe.call({method:"wiki.wiki.doctype.wiki_page.wiki_page.update",args:{name:$('[name="wiki_page"]').val(),wiki_page_patch:$('[name="wiki_page_patch"]').val(),message:this.get_value("edit_message"),sidebar_edited:this.get_value("sidebar_edited"),content:s.content,type:s.code_field_group.get_value("type"),attachments:s.attachments,new:$('[name="new"]').val(),title:$(".edit-title span").text(),new_sidebar:$(".doc-sidebar").get(0).innerHTML,new_sidebar_items:t,draft:e||null},callback:d=>{!d.message.approved&&d.message.route=="contributions"?frappe.msgprint({message:"A Change Request has been created. You can track your requests on the contributions page",indicator:"green",title:"Change Request Created",alert:1}):!d.message.approved&&d.message.route=="drafts"&&frappe.msgprint({message:"Draft Saved",indicator:"green",title:"Change Request Created",alert:1}),window.location.href="/"+d.message.route},freeze:!0}),r.hide(),$("#freeze").addClass("show")}});r.show()}render_preview(){$('a[data-toggle="tab"]').on("click",e=>{let t=$(e.target);if(t.prop("id")==="preview-tab"||t.prop("id")==="diff-tab"){let a=$(".wiki-preview"),s=$(".wiki-diff"),o=this.code_field_group.get_value("type"),n="";if(o=="Markdown")n=this.code_field_group.get_value("code_md");else{n=this.code_field_group.get_value("code_html");var i=new TurndownService;i=i.keep(["div class","iframe","table"]),n=i.turndown(n)}if(!n){this.set_empty_message(a,s);return}this.set_loading_message(a,s),frappe.call({method:"wiki.wiki.doctype.wiki_page.wiki_page.preview",args:{content:n,type:o,path:this.route,name:$('[name="wiki_page"]').val(),attachments:this.attachments,new:$('[name="new"]').val()},callback:r=>{if(r.message&&(a.html(r.message.html),!$('[name="new"]').val())){let d='<div class="text-muted center"> No Changes made</div>',l=$(r.message.diff).find(".insert, .delete").length?r.message.diff:d;s.html(l)}}})}})}set_empty_message(e,t){e.html("<div>Please add some code</div>"),t.html("<div>Please add some code</div>")}set_loading_message(e,t){e.html("Loading preview..."),t.html("Loading diff...")}add_attachment_handler(){var e=this;$(".add-attachment-wiki").click(function(){e.new_attachment()}),$(".submit-wiki-page").click(function(){e.get_markdown()}),$(".draft-wiki-page").click(function(){e.get_markdown(!0)})}new_attachment(){this.dialog&&this.dialog.$wrapper.remove(),new frappe.ui.FileUploader({folder:"Home/Attachments",on_success:e=>{this.attachments||(this.attachments=[]),this.save_paths||(this.save_paths={}),this.attachments.push(e),$(".wiki-attachment").empty().append(this.build_attachment_table()),$(".attachment-controls").find(".number").text(this.attachments.length)}})}get_markdown(e=!1){var t=this;t.code_field_group.get_value("type")=="Markdown"?(this.content=t.code_field_group.get_value("code_md"),this.raise_patch(e)):(this.content=this.code_field_group.get_value("code_html"),frappe.call({method:"wiki.wiki.doctype.wiki_page.wiki_page.extract_images_from_html",args:{content:this.content},callback:i=>{if(i.message){t.content=i.message;var a=new TurndownService;a=a.keep(["div class","iframe","table"]),t.content=a.turndown(t.content),t.raise_patch(e)}}}))}set_listeners(){var e=this;$("body").on("click",".copy-link",function(){frappe.utils.copy_to_clipboard($(this).attr("data-link"))}),$("body").on("click",".delete-button",function(){frappe.confirm(`Are you sure you want to delete the file "${$(this).attr("data-name")}"`,()=>{e.attachments.forEach((t,i,a)=>{t.file_name==$(this).attr("data-name")&&a.splice(i,1)}),$(".wiki-attachment").empty().append(e.build_attachment_table()),$(".attachment-controls").find(".number").text(e.attachments.length)})})}create_comment_box(){this.comment_box=frappe.ui.form.make_control({parent:$(".comment-box"),df:{fieldname:"new_comment",fieldtype:"Comment"},enable_mentions:!1,render_input:!0,only_input:!0,on_submit:e=>{this.add_comment_to_patch(e)}})}add_comment_to_patch(e){strip_html(e).trim()!=""&&(this.comment_box.disable(),frappe.call({method:"wiki.wiki.doctype.wiki_page_patch.wiki_page_patch.add_comment_to_patch",args:{reference_name:$('[name="wiki_page_patch"]').val(),content:e,comment_email:frappe.session.user,comment_by:frappe.session.user_fullname},callback:t=>{e=t.message,this.display_new_comment(e,this.comment_box)},always:()=>{this.comment_box.enable()}}))}display_new_comment(e,t){if(e){t.set_value("");let i=this.get_comment_html(e.owner,e.creation,e.timepassed,e.content);$(".timeline-items").prepend(i)}}get_comment_html(e,t,i,a){return $(`
			<div class="timeline-item">
				<div class="timeline-badge">
					<svg class="icon icon-md">
						<use href="#icon-small-message"></use>
					</svg>
				</div>
				<div class="timeline-content frappe-card">
					<div class="timeline-message-box">
						<span class="flex justify-between">
							<span class="text-color flex">
								<span>
									${e}
									<span class="text-muted margin-left">
										<span class="frappe-timestamp "
											data-timestamp="${t}"
											title="${t}">${i}</span>
									</span>
								</span>
							</span>
						</span>
						<div class="content">
							${a}
						</div>
					</div>
				</div>
			</div>
		`)}make_title_editable(){let e=$(".edit-title>span"),t=$(".edit-title>i"),i=$(".edit-title>input");t.click(()=>{e.addClass("hide"),t.addClass("hide"),i.removeClass("hide"),i.val(e.text()),i.focus()}),i.focusout(()=>{e.removeClass("hide"),t.removeClass("hide"),i.addClass("hide"),e.text(i.val())}),i.on("change",a=>{$(".doc-sidebar .sidebar-items a.active").text(i.val())})}approve_wiki_page(){frappe.call({method:"wiki.wiki.doctype.wiki_page.wiki_page.approve",args:{wiki_page_patch:$('[name="wiki_page_patch"]').val()},callback:()=>{frappe.msgprint({message:"The Change has been approved.",indicator:"green",title:"Approved"}),window.location.href="/"+$('[name="wiki_page"]').val()},freeze:!0})}render_sidebar_diff(){let e=$(".sidebar-diff"),t=$('[name="new_sidebar_items"]').val(),i=t&&JSON.parse(t);e.empty();for(let a in i)for(let s in i[a]){let o=("."+a).replaceAll("/","\\/"),n=e.find(o);n.length||(n=$(".sidebar-diff")),i[a][s].type=="Wiki Sidebar"?$(n).append("<li>"+i[a][s].title+"</li><ul class="+i[a][s].group_name+"></ul>"):$(n).append("<li class="+i[a][s].group_name+">"+i[a][s].title+"</li>")}}};window.Wiki=class{activate_sidebars(){$(".sidebar-item").each(function(i){let a="active",s=window.location.pathname;s.indexOf("#")!==-1&&(s=s.slice(0,s.indexOf("#"))),$(this).data("route")==s&&($(this).addClass(a),$(this).find("a").addClass(a))});let e=$(".sidebar-item.active");e.length>0&&e.get(1).scrollIntoView(!0,{behavior:"smooth",block:"nearest"});let t=$(".web-sidebar");t.length>0&&t.get(1).scrollBy({top:-100,behavior:"smooth"})}toggle_sidebar(e){$(e.currentTarget).parent().children("ul").toggleClass("hidden"),$(e.currentTarget).find(".drop-icon").toggleClass("hidden"),$(e.currentTarget).find(".drop-left").toggleClass("hidden"),e.stopPropagation()}set_active_sidebar(){$(".doc-sidebar,.web-sidebar").on("click",".collapsible",this.toggle_sidebar),$(".sidebar-group").children("ul").addClass("hidden"),$(".sidebar-item.active").parents(" .web-sidebar .sidebar-group>ul").removeClass("hidden");let e=$(".sidebar-item.active").parents(".web-sidebar .sidebar-group");e.each(function(){$(this).children(".collapsible").find(".drop-left").addClass("hidden")}),e.each(function(){$(this).children(".collapsible").find(".drop-icon").removeClass("hidden")})}scrolltotop(){$("html,body").animate({scrollTop:0},0)}set_darkmode_button(){function e(){let i=$(".navbar-brand img").data("alt-src"),a=$(".navbar-brand img").attr("src");i!=="{{ light_mode_logo }}"&&i!=="{{ dark_mode_logo }}"&&($(".navbar-brand img").attr("src",i),$(".navbar-brand img").data("alt-src",a))}let t=localStorage.getItem("darkMode");t===null||t==="false"?$(".sun-moon-container .feather-sun").removeClass("hide"):($(".sun-moon-container .feather-moon").removeClass("hide"),e()),$(".sun-moon-container").on("click",function(){$(".sun-moon-container .feather-sun").toggleClass("hide"),$(".sun-moon-container .feather-moon").toggleClass("hide"),e(),$("body").toggleClass("dark"),localStorage.setItem("darkMode",$("body").hasClass("dark"))})}};window.EditWiki=class extends Wiki{constructor(){super(),frappe.provide("frappe.ui.keys"),$("document").ready(()=>{frappe.call("wiki.wiki.doctype.wiki_page.wiki_page.get_sidebar_for_page",{wiki_page:$('[name="wiki_page"]').val()}).then(e=>{this.set_darkmode_button(),$(".doc-sidebar").empty().append(e.message),this.activate_sidebars(),this.set_active_sidebar(),this.set_empty_ul(),this.set_sortable(),this.set_add_item(),this.scrolltotop(),this.add_trash_icon()})})}add_trash_icon(){!window.location.pathname.endsWith("/edit-wiki")||($(".sidebar-item > div, .sidebar-group > div").each(function(e){$(`<div class="text-muted remove-sidebar-item small">
      <span class="trash-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
      </span>
    </div>`).insertAfter($(this))}),$(".remove-sidebar-item").click(function(){let e=$(this).parent().data("type"),t=$(this).parent().data("route"),i=$(this).parent().data("title");e==="Wiki Page"?frappe.msgprint({title:__("Delete Wiki Page"),indicator:"red",message:__(`Are you sure you want to <b>delete</b> the Wiki Page <b>${i}</b>?`),primary_action:{label:"Yes",action(){frappe.call({method:"wiki.wiki.doctype.wiki_page.wiki_page.delete_wiki_page",args:{wiki_page_route:t},callback:a=>{if(a.message){let s=window.location.pathname.split("/");s.pop();let o=s.pop()||s.pop();t.substring(1)===o?window.location.assign("/wiki"):window.location.reload()}}})}}}):e==="Wiki Sidebar"&&frappe.msgprint({title:__("Delete Wiki Sidebar Group"),indicator:"red",message:__(`Are you sure you want to <b>delete</b> the Wiki Sidebar Group <b>${i}</b>?<br>This will also delete all the children under it.`),primary_action:{label:"Yes",action(){frappe.call({method:"wiki.wiki.doctype.wiki_sidebar.wiki_sidebar.delete_sidebar_group",args:{sidebar_group_name:t.substring(1)},callback:a=>{a.message&&($(`.sidebar-group[data-route='${t}']`).remove(),this.hide())}})}}})}))}activate_sidebars(){$(".sidebar-item").each(function(i){let a="active",s=window.location.pathname;s.indexOf("#")!==-1&&(s=s.slice(0,s.indexOf("#"))),s.split("/").slice(0,-1).join("/")==$(this).data("route")&&($('[name="new"]').first().val()?$(`
					<li class="sidebar-item active" data-type="Wiki Page" data-name="new-wiki-page" data-new=1>
						<div><div>
							<a href="#"  class ='active'>New Wiki Page</a>
						</div></div>
					</li>
				`).insertAfter($(this)):($(this).addClass(a),$(this).find("a").addClass(a)))});let e=$(".sidebar-item.active");e.length>0&&e.get(0).scrollIntoView(!0,{behavior:"smooth",block:"nearest"});let t=$(".web-sidebar");t.length>0&&t.get(0).scrollBy({top:-100,behavior:"smooth"})}set_empty_ul(){$(".collapsible").each(function(){$(this).parent().find("ul").length==0&&$(this).parent().append($('<ul class="list-unstyled hidden" style="min-height:20px;"> </ul'))})}set_sortable(){$(".web-sidebar ul").each(function(){new Sortable(this,{group:{name:"qux",put:["qux"],pull:["qux"]}})})}set_add_item(){$(`<div class="text-muted add-sidebar-item small">+ Add Group</div>
			<div class="text-muted small mt-3"><i>Drag items to re-order</i></div>`).appendTo($(".web-sidebar"));var e=this;$(".add-sidebar-item").click(function(){var t=e.get_add_new_item_dialog_fields(),i=new frappe.ui.Dialog({title:"Add Group to Sidebar",fields:t,primary_action:function(a){e.add_wiki_sidebar(a),i.hide()}});i.show()})}get_add_new_item_dialog_fields(){return[{fieldname:"route",label:"Route",fieldtype:"Data",mandatory_depends_on:!0},{fieldname:"title",label:"Title",fieldtype:"Data",mandatory_depends_on:!0}]}add_wiki_sidebar(e){this.get_wiki_sidebar_html(e).appendTo($(".doc-sidebar .sidebar-items").children(".list-unstyled").not(".hidden").first()),$(".web-sidebar ul").each(function(){new Sortable(this,{group:{name:"qux",put:["qux"],pull:["qux"]}})})}get_wiki_sidebar_html(e){return $(`
			<li class="sidebar-group" data-type="Wiki Sidebar"
				data-name="new-sidebar" data-group-name="${e.route}"
				data-new=1 data-title="${e.title}" draggable="false">

				<div class="collapsible">
					<span class="drop-icon hidden">
							<svg width="24" height="24" viewBox="0 0 24 24" fill="none"
								xmlns="http://www.w3.org/2000/svg">
								<path d="M8 10L12 14L16 10" stroke="#4C5A67"
								stroke-miterlimit="10" stroke-linecap="round"
								stroke-linejoin="round"></path>
							</svg>
					</span>

					<span class="drop-left">
							<svg width="24" height="24" viewBox="0 0 24 24"
								fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M10 16L14 12L10 8" stroke="#4C5A67"
								stroke-linecap="round" stroke-linejoin="round"></path>
							</svg>
					</span>
					<span class="h6">${e.title}</span>
					</div>
					<ul class="list-unstyled hidden" style="min-height:20px;"> </ul>
			</li>
			`)}};window.RenderWiki=class extends Wiki{constructor(e){super(),$("document").ready(()=>{this.set_darkmode_button(),window.location.pathname!="/revisions"&&window.location.pathname!="/compare"&&(this.activate_sidebars(),this.set_active_sidebar(),this.set_nav_buttons(),this.set_toc_highlighter(),this.scrolltotop())})}set_toc_highlighter(){$(document).ready(function(){$(window).scroll(function(){s().not(".no-underline").hasClass("active")||($(".page-toc a").removeClass("active"),s().addClass("active"))})});function e(o){return $('[href="'+o+'"]')}function t(o){return $("[id="+o.substr(1)+"]")}var i=null;function a(){return i||(i=$(".page-toc a").map(function(){return $(this).attr("href")})),i}function s(){var o=window.pageYOffset,n=null;return a().each(function(){var r=t(this).position().top;if(r<o+window.innerHeight*.23){n=this;return}}),e(n)}}set_nav_buttons(){var e=-1;$(".sidebar-column").find("a").each(function(t){$(this).attr("class")&&$(this).attr("class").split(/\s+/)[0]==="active"&&(e=t)}),e>0?($(".btn.left")[0].href=$(".sidebar-column").find("a")[e-1].href,$(".btn.left")[0].innerHTML="\u2190"+$(".sidebar-column").find("a")[e-1].innerHTML):$(".btn.left").hide(),e>=0&&e<$(".sidebar-column").find("a").length-1?($(".btn.right")[0].href=$(".sidebar-column").find("a")[e+1].href,$(".btn.right")[0].innerHTML=$(".sidebar-column").find("a")[e+1].innerHTML+"\u2192"):$(".btn.right").hide()}};})();
//# sourceMappingURL=wiki.bundle.RKY2J7VP.js.map
