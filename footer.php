<footer class="site-footer">
	<?php if(is_home()|| is_front_page()):?>
		<p>Este proyecto cuenta con el apoyo de Fundación Daniel y Nina Carasso</p>
	<?php endif;?>
	<div class="enconstruccion">
		Sitio en construcción v.<?php echo PLURI_VERSION;?>
	</div>
</footer>
<?php wp_footer(); ?>
</body>
</html>