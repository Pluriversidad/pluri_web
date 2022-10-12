<div class="nav-institutos">
	<?php 
	$institutos = get_children(
		array(
			'post_parent' 	=> 8,
			'orderby'		=> 'menu_order',
			'order'			=> 'ASC',
			'post_type'		=> 'page'
		)
	);

	foreach($institutos as $instituto) {
		?>
		<a class="instituto <?php echo($instituto->ID == $post->ID) ? 'current' : '';?>" href="<?php echo get_permalink($instituto->ID);?>">
			<h2>
				<?php echo $instituto->post_title;?>
			</h2>
		</a>

		<?php 
	}
	?>
</div>