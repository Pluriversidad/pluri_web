<?php get_header(); ?>
<main id="primary" class="site-main">

  <div class="home-section">

    <div id="kd-graph" style="width: 100%;height: 600px;"></div>
    <?php if (isset($_GET['pl_ver']) && $_GET['pl_ver'] == 'low') {
    ?>
      <div class="pluri_low-tag-cloud">
        <?php
        $tags = get_terms(array('taxonomy' => 'post_tag'));
        foreach ($tags as $tag) {
        ?>
          <a href="<?= get_term_link($tag->term_id, 'post_tag'); ?>"><?= $tag->name; ?>(<?= $tag->count; ?>)</a>
        <?php
        } ?>
      </div>
    <?php
    }; ?>
  </div>

</main>


<?php //get_template_part('parts/institutos-nav');
?>

<?php get_footer(); ?>