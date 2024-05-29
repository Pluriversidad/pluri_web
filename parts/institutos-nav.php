<div class="nav-institutos">
	<?php 
	$args = array(
		'taxonomy' 		=> 'instituto',
		'hide_empty'	=> false
	);
	
	$institutos = get_terms( $args );
	$current_taxonomy = $wp_query->get_queried_object();
	//var_dump($institutos);

	foreach($institutos as $instituto) {
		?>
		<a class="instituto <?php echo($instituto->term_id == $current_taxonomy->term_id) ? 'current' : '';?>" href="<?php echo get_term_link($instituto->term_id);?>">
			<h2>
				<?php echo $instituto->name;?>
			</h2>
		</a>

		<?php 
	}
	?>
</div>